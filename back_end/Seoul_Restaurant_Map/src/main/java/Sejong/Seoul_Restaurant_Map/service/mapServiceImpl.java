package Sejong.Seoul_Restaurant_Map.service;

import Sejong.Seoul_Restaurant_Map.domain.*;
import Sejong.Seoul_Restaurant_Map.dto.restaurantResponseDto;
import Sejong.Seoul_Restaurant_Map.repository.CategoryListRepository;
import Sejong.Seoul_Restaurant_Map.repository.ChannelsRepository;
import Sejong.Seoul_Restaurant_Map.repository.RestaurantRepository;
import Sejong.Seoul_Restaurant_Map.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class mapServiceImpl {
    private final RestaurantRepository restaurantRepository;
    private final CategoryListRepository categoryListRepository;
    private final ChannelsRepository channelsRepository;
    private final VideoRepository videoRepository;

    public List<restaurantResponseDto> searchByRange(double x_start, double x_end, double y_start, double y_end)
    {
        Pageable pageable = PageRequest.of(0, 20);
        Page<Restaurant> restaurants = restaurantRepository.findByLocationXBetweenAndLocationYBetween(x_start,x_end,y_start,y_end,pageable);

        List<restaurantResponseDto> results = restaurants.getContent().stream()
                .map(o -> new restaurantResponseDto(o)).collect(Collectors.toList());
        return results;
    }

    public List<restaurantResponseDto> searchByAdvanced(List<String> channels, List<String> tags, int views )
    {
            List<Category_list> categoryLists = categoryListRepository.findByCategoryIn(tags);
            List<List<Restaurant_category>> restaurantsCategory = categoryLists.stream()
                    .map(o -> o.getRestaurantCategoryList()).collect(Collectors.toList());
            List<Restaurant_category> flatterndList = restaurantsCategory.stream()
                    .flatMap(List::stream).collect(Collectors.toList());
            List<Restaurant> listFromCategory = flatterndList.stream()
                    .map(o -> o.getRestaurant()).collect(Collectors.toList());
            List<Restaurant> deleteDuplicated = listFromCategory.stream()
                    .distinct().collect(Collectors.toList());
            List<List<Restaurant_video>> forViewsFilter = deleteDuplicated.stream()
                    .map(o -> o.getVideoList()).collect(Collectors.toList());
            List<Restaurant_video> flatForViewsFilter = forViewsFilter.stream()
                    .flatMap(List::stream).collect(Collectors.toList());
            List<Video> videosFromTag = flatForViewsFilter.stream()
                    .map(o -> o.getVideo()).collect(Collectors.toList());
            videosFromTag.removeIf(o -> (o.getVideoViews() < views));
            List<List<Restaurant_video>> restore = videosFromTag.stream()
                    .map(o -> o.getRestaurantVideoList()).collect(Collectors.toList());
            List<Restaurant_video> flatRestore = restore.stream()
                    .flatMap(List::stream).collect(Collectors.toList());
        List<Restaurant> resultFromTags = flatRestore.stream()
                    .map(o -> o.getRestaurant()).collect(Collectors.toList())
                .stream().distinct().collect(Collectors.toList());


            List<Channels> channelsList = channelsRepository.findByChannelNameIn(channels);
            List<List<Playlists>> playlists = channelsList.stream()
                    .map(o -> o.getPlaylists()).collect(Collectors.toList());
            List<Playlists> flatterndPlaylist = playlists.stream()
                    .flatMap(List::stream).collect(Collectors.toList());
            List<List<Video> > videoList = flatterndPlaylist.stream()
                    .map(o -> o.getVideos()).collect(Collectors.toList());
            List<Video> flatternedVideoList = videoList.stream()
                    .flatMap(List::stream).collect(Collectors.toList());
            flatternedVideoList.removeIf(o -> (o.getVideoViews() < views));
            List<List<Restaurant_video>> restaurantVideosList = flatternedVideoList.stream()
                    .map(o -> o.getRestaurantVideoList()).collect(Collectors.toList());
            List<Restaurant_video> flatternedRestaurantVideo = restaurantVideosList.stream()
                    .flatMap(List::stream).collect(Collectors.toList());
        List<Restaurant> resultFromChannel = flatternedRestaurantVideo.stream()
                    .map(o -> o.getRestaurant()).collect(Collectors.toList()).stream()
                .distinct().collect(Collectors.toList());


        if (channels.size() == 0 && tags.size() == 0)
        {
            List<Video> top20 = videoRepository.findTop20ByVideoViewsGreaterThanEqual(views);
            List<List<Restaurant_video>> transf = top20.stream().map(o -> o.getRestaurantVideoList()).collect(Collectors.toList());
            List<Restaurant_video> flattern = transf.stream().flatMap(List::stream).collect(Collectors.toList());
            List<Restaurant> restaurants = flattern.stream().map(o -> o.getRestaurant()).collect(Collectors.toList());
            List<restaurantResponseDto> rtn = restaurants.stream().map(o -> new restaurantResponseDto(o)).collect(Collectors.toList());
            return rtn;
        }
        else if (channels.size() == 0)
        {
            List<restaurantResponseDto> rtn = resultFromTags.stream()
                    .map(o -> new restaurantResponseDto(o)).collect(Collectors.toList());
            return rtn;
        }
        else if (tags.size() == 0)
        {
            List<restaurantResponseDto> rtn = resultFromChannel.stream()
                    .map(o -> new restaurantResponseDto(o)).collect(Collectors.toList());
            return rtn;
        }
        else
        {
            List<Restaurant> res = resultFromChannel.stream()
                    .filter(s -> resultFromTags.contains(s)).collect(Collectors.toList());
            res.stream().distinct();
            List<restaurantResponseDto> rtn = res.stream().map(o -> new restaurantResponseDto(o)).collect(Collectors.toList());
            return rtn;
        }
    }

}
