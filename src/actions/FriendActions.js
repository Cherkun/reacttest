import * as types from "../constants/ActionTypes"
import fetch from 'isomorphic-fetch'

export function addFriend(name) {
    return {
        type: types.ADD_FRIEND,
        name
    }
}
export function deleteFriend(id) {
    return {
        type: types.DELETE_FRIEND,
        id
    }
}
export function starFriend(id) {
    return {
        type: types.STAR_FRIEND,
        id
    }
}

export function invalidateFriends(list) {
    return {
        type: types.INVALIDATE_FRIEND,
        list
    }
}

function requestFriends(list) {
    return {
        type: types.REQUEST_FRIEND,
        list
    }
}

function receiveFriends(list, json) {
    return {
        type: types.RECEIVE_FRIEND,
        list,
        friends: json,
        receivedAt: Date.now()
    }
}

// Тут мы встречаемся с нашим первым thunk-генератором действий! Хотя его содержимое
// отличается, вы должны использовать его, как и любой другой генератор действий:
// store.dispatch(fetchPosts('reactjs'))

export function fetchFriends(list) {

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

        return fetch(`http://new/${list}.json`)
            .then(response => response.json())
            .then(json =>

                // Мы можем вызывать dispatch много раз!
                // Здесь мы обновляем состояние приложения с результатами вызова API.

                dispatch(receiveFriends(list, json))
            )

        // В реальном приложении вы также захотите ловить ошибки сетевых запросов.

    }
}