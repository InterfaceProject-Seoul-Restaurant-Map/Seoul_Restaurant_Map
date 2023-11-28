package Sejong.Seoul_Restaurant_Map.service;

import Sejong.Seoul_Restaurant_Map.domain.Restaurant;
import Sejong.Seoul_Restaurant_Map.domain.User;
import Sejong.Seoul_Restaurant_Map.domain.UserRestaurantList;
import Sejong.Seoul_Restaurant_Map.domain.UserRestaurantListInfo;
import Sejong.Seoul_Restaurant_Map.dto.findListResponseDto;
import Sejong.Seoul_Restaurant_Map.dto.listResponseDto;
import Sejong.Seoul_Restaurant_Map.repository.RestaurantRepository;
import Sejong.Seoul_Restaurant_Map.repository.UserRepository;
import Sejong.Seoul_Restaurant_Map.repository.UserRestaurantListInfoRepository;
import Sejong.Seoul_Restaurant_Map.repository.UserRestaurantListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class listServiceImpl {

    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    private final UserRestaurantListInfoRepository userRestaurantListInfoRepository;
    private final UserRestaurantListRepository userRestaurantListRepository;

    public List<listResponseDto> searchListByUserId(String userId)
    {
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent())
        {
            User user = userOptional.get();
            List<UserRestaurantListInfo> userList = user.getInfoList();
            return userList.stream().map(o -> new listResponseDto(o)).collect(Collectors.toList());
        }
        else {
            return null;
        }
    }

    public List<findListResponseDto> findList(String userId)
    {
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent())
        {
            User user = userOptional.get();
            return user.getInfoList().stream().map(o -> new findListResponseDto(o)).collect(Collectors.toList());
        }
        else
            return null;
    }

    public int addRestaurantToList(String restaurantName, Long listId)
    {
        Optional<Restaurant> restaurantOptional = restaurantRepository.findById(restaurantName);

        if (restaurantOptional.isPresent())
        {
            Restaurant restaurant = restaurantOptional.get();
            Optional<UserRestaurantListInfo> listInfoOptional = userRestaurantListInfoRepository.findById(listId);
            if (listInfoOptional.isPresent())
            {
                UserRestaurantListInfo listInfo = listInfoOptional.get();
                List<UserRestaurantList> userRestaurantLists = listInfo.getRestaurantList();
                List<Restaurant> restaurantList = userRestaurantLists.stream().map(o -> o.getRestaurant()).collect(Collectors.toList());
                if (restaurantList.contains(restaurant) == true)
                {
                    return 1;
                }
                else
                {
                    UserRestaurantList userRestaurantList = new UserRestaurantList();
                    userRestaurantList.setRestaurant(restaurant);
                    userRestaurantList.setInfo(listInfo);
                    listInfo.getRestaurantList().add(userRestaurantList);
                    userRestaurantListRepository.save(userRestaurantList);
                    return 0;
                }
            }
            else
                return 3;
        }
        else
            return 2;
    }

    public int createList(String userId, String listName)
    {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent())
        {
            User user = userOptional.get();
            List<UserRestaurantListInfo> infoList = user.getInfoList();
            Iterator<UserRestaurantListInfo> it = infoList.iterator();
            while (it.hasNext()) {
                UserRestaurantListInfo check = it.next();
                if (check.getListNickname().equals(listName))
                    return 1;
            }

            UserRestaurantListInfo newList = new UserRestaurantListInfo();
            newList.setListNickname(listName);
            newList.setUser(user);
            user.getInfoList().add(newList);
            userRestaurantListInfoRepository.save(newList);
            return 0;
        }
        else
            return 3;
    }

    public int deleteListElement(String restaurantName, String listName, String userId)
    {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent())
        {
            User user = userOptional.get();
            List<UserRestaurantListInfo> infoList = user.getInfoList();

            Iterator<UserRestaurantListInfo> it = infoList.iterator();
            while (it.hasNext()) {
                UserRestaurantListInfo check = it.next();
                if (check.getListNickname().equals(listName))
                {
                    List<UserRestaurantList> restaurantLists = check.getRestaurantList();

                    Iterator<UserRestaurantList> it2 = restaurantLists.iterator();
                    while (it2.hasNext()) {
                        UserRestaurantList del = it2.next();
                        if (del.getRestaurant().getRestaurant_name().equals(restaurantName))
                        {
                            check.getRestaurantList().remove(del);
                            userRestaurantListInfoRepository.save(check);
                            userRestaurantListRepository.delete(del);
                            return 0;
                        }
                    }
                    return 4;
                }
            }
            return 2;
        }
        else
            return 1;
    }

    public int deleteList(String listName, String userId)
    {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent())
        {
            User user = userOptional.get();

            Iterator<UserRestaurantListInfo> it = user.getInfoList().iterator();
            while (it.hasNext())
            {
                UserRestaurantListInfo del = it.next();
                if (del.getListNickname().equals(listName))
                {
                    user.getInfoList().remove(del);
                    userRepository.save(user);
                    userRestaurantListInfoRepository.delete(del);
                    return 0;
                }
            }

            return 4;
        }
        else
            return 1;
    }

    public int copyFriendList(String friendId, String userId, String srcListName, String destListName)
    {
        Optional<User> userOptional = userRepository.findById(friendId);
        if (userOptional.isPresent())
        {
            User friend = userOptional.get();
            Optional<UserRestaurantListInfo> friendListOptional = friend.getInfoList().stream()
                    .filter(o -> o.getListNickname().equals(srcListName))
                    .findAny();
            if (friendListOptional.isPresent())
            {
                UserRestaurantListInfo myList = new UserRestaurantListInfo();
                UserRestaurantListInfo friendList = friendListOptional.get();
                List<UserRestaurantList> restaurantLists = friendList.getRestaurantList();

                Optional<User> userOptional1 = userRepository.findById(userId);
                if (userOptional1.isPresent())
                {
                    User user = userOptional1.get();
                    myList.setUser(user);
                    myList.setListNickname(destListName);
                    myList.setRestaurantList(new ArrayList<UserRestaurantList>());
                    user.getInfoList().add(myList);
                    userRestaurantListInfoRepository.save(myList);
                    Iterator<UserRestaurantList> it =  restaurantLists.iterator();
                    while (it.hasNext())
                    {
                        UserRestaurantList copy = it.next();

                        UserRestaurantList newElement = new UserRestaurantList();
                        newElement.setInfo(myList);
                        newElement.setRestaurant(copy.getRestaurant());
                        myList.getRestaurantList().add(newElement);
                        userRestaurantListRepository.save(newElement);
                    }
                    return 0;
                }
                return 3;

            }
            return 2;
        }
        else
            return 1;
    }

    public int isExistFriend(String friendId, String userId)
    {
        if (friendId.equals(userId))
            return 1;
        Optional<User> userOptional = userRepository.findById(friendId);
        if (userOptional.isPresent())
            return 0;

        return 2;
    }
}
