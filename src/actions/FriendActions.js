import * as types from "../constants/ActionTypes"
import fetch from 'isomorphic-fetch'

export const addFriend=(name, type)=>{
    var data = new FormData();
    data.append( "friend", JSON.stringify( {'name': name, 'type': type} ) );
    return {
        type: types.ADD_FRIEND,
        name,
        payload: new Promise((resolve, reject) => {
            fetch('http://new/friends/add_friend.php', {method: 'POST', body: data})
        })
    }
}
export const deleteFriend=id=> {
    var data = new FormData();
    data.append( "friend", JSON.stringify( {'id': id} ) );
    return {
        type: types.DELETE_FRIEND,
        id,
        payload: new Promise((resolve, reject) => {
            fetch('http://new/friends/delete_friend.php', {method: 'POST', body: data})
        })
    }
}
export const starFriend=id=>{
    var data = new FormData();
    data.append( "friend", JSON.stringify( {'id': id} ) );
    return {
        type: types.STAR_FRIEND,
        id,
        payload: new Promise((resolve, reject) => {
            fetch('http://new/friends/star_friend.php', {method: 'POST', body: data})
        })
    }
}

export const invalidateFriends=list=> {
    return {
        type: types.INVALIDATE_FRIEND,
        list
    }
}

const requestFriends = list => {
    return {
        type: types.REQUEST_FRIEND,
        list
    }
}

const receiveFriends = (list, json, cart) => {
    return {
        type: types.RECEIVE_FRIEND,
        list,
        friends: json.data,
        meta: json.meta,
        receivedAt: Date.now(),
        cart
    }
}

const addToCartUnsafe = (friendId, name, count, price) => ({
    type: types.ADD_TO_CART,
    friendId,
    count,
    price,
    name
})

export const addToCart = (friendId, name, count, price) => dispatch => {
   dispatch(addToCartUnsafe(friendId, name, count, price))
}

// Тут мы встречаемся с нашим первым thunk-генератором действий! Хотя его содержимое
// отличается, вы должны использовать его, как и любой другой генератор действий:
// store.dispatch(fetchPosts('reactjs'))

export const fetchFriends=(list, limit, offset, cart)=> {

    // Thunk middleware знает, как обращаться с функциями.
    // Он передает метод действия в качестве аргумента функции,
    // т.к. это позволяет отправить действие самостоятельно.

    return function (dispatch) {

        // Первая отправка: состояние приложения обновлено,
        // чтобы сообщить, что запускается вызов API.

        dispatch(requestFriends(list))

        // Функция, вызываемая Thunk middleware, может возвращать значение,
        // которое передается как возвращаемое значение метода dispatch.

        // В этом случае мы возвращаем Promise.
        // Thunk middleware не требует этого, но это удобно для нас.

        var data = new FormData();
        data.append( "friend", JSON.stringify( {'limit': limit, 'offset': offset} ) );

        return fetch(`http://new/${list}.json`, {method: 'POST', body: data})
            .then(response => response.json())
            .then(json =>

                // Мы можем вызывать dispatch много раз!
                // Здесь мы обновляем состояние приложения с результатами вызова API.

                dispatch(receiveFriends(list, json, cart))
            )

        // В реальном приложении вы также захотите ловить ошибки сетевых запросов.

    }
}