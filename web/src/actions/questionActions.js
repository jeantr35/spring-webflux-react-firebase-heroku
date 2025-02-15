const URL_BASE = 'https://pure-tor-90145.herokuapp.com';

export const LOADING = 'LOADING'
export const LOADED_SUCCESS = 'LOADED_SUCCESS'
export const LOADED_FAILURE = 'LOADED_FAILURE'

export const loading = () => ({ type: LOADING })

export const success = payload => ({
    type: LOADED_SUCCESS,
    payload
});

export const failure = () => ({ type: LOADED_FAILURE })

export function updateUser(name, auth){
    const user = auth().currentUser;
    console.log(name)
    return async dispatch => {
        dispatch(loading())
        try {
            user.updateProfile({
                displayName: {name}
              })
            dispatch(success({redirect: `/update`}))
        } catch (error) {
            dispatch(failure())
        }
    }
}

export function fetchQuestions() {
    return async dispatch => {
        dispatch(loading())
        try {
            const response = await fetch(
                `${URL_BASE}/getAll`
            )
            const data = await response.json()
            dispatch(success({ questions: data, redirect: null }))
        } catch (error) {
            dispatch(failure())
        }
    }
}

export function fetchOwnerQuestions(userId) {
    return async dispatch => {
        dispatch(loading())
        try {
            const response = await fetch(`${URL_BASE}/getOwnerAll/${userId}`)
            const data = await response.json()
            dispatch(success({ questions: data, redirect: null }))
        } catch (error) {
            dispatch(failure())
        }
    }
}

export function fetchCategoryQuestions(category) {
    return async dispatch => {
        dispatch(loading())
        try {
            const response = await fetch(`${URL_BASE}/getQuestionsByCategory/${category}`)
            const data = await response.json()
            dispatch(success({ questions: data, redirect: null }))
        } catch (error) {
            dispatch(failure())
        }
    }
}

export function fetchQuestionsByCriteria(title) {
    return async dispatch => {
        dispatch(loading())
        try {
            const response = await fetch(`${URL_BASE}/getQuestionsByCriteria/${title}`)
            const data = await response.json()
            dispatch(success({ questions: data, redirect: null }))
        } catch (error) {
            dispatch(failure())
        }
    }
}

export function redirectToNewQuestion(){
    return async dispatch => {
        dispatch(success({redirect: `/new`}));
    }
}

export function redirectToUpdateQuestion(id){
    return async dispatch => {
        dispatch(success({redirect: `/updateQuestion/${id}`}));
    }
}



export function fetchQuestion(id) {
    return async dispatch => {
        dispatch(loading())
        try {
            const response = await fetch(`${URL_BASE}/get/${id}`)
            const data = await response.json()
            dispatch(success({ question: data, redirect: null }))
        } catch (error) {
            dispatch(failure())
        }
    }
}

export function postQuestion(question) {
    return async dispatch => {
        dispatch(loading())
        try {
            const response = await fetch(`${URL_BASE}/create`,
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(question)
                }
            )
            const id = await response.text()
            dispatch(success({redirect: `/question/${id}`}));
        } catch (error) {
            dispatch(failure())
        }
    }
}

export function sendVote(vote) {
    return async dispatch => {
        dispatch(loading())
        try {
            const response = await fetch(`${URL_BASE}/vote`,
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(vote)
                }
            )
            const id = await response.text()
            dispatch(success({redirect: `/question/${vote.questionId}`}));
        } catch (error) {
            dispatch(failure())
        }
    }
}

export function updateQuestion(question) {
    return async dispatch => {
        dispatch(loading())
        try {
            const response = await fetch(`${URL_BASE}/update`,
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(question)
                }
            )
            const id = await response.text()
            dispatch(success({redirect: `/question/${id}`}));
        } catch (error) {
            dispatch(failure())
        }
    }
}


export function deleteQuestion(id) {
    return async dispatch => {
        dispatch(loading())
        try {
            await fetch(`${URL_BASE}/delete/${id}`,
                {
                    method: 'DELETE',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            dispatch(success({redirect: `/list`}));
        } catch (error) {
            dispatch(failure())
        }
    }
}

export function deleteAnswer(answer) {
    console.log(answer)
    return async (dispatch) => {
      dispatch(loading());
      try {
        await fetch(`${URL_BASE}/deleteAnswer/${answer.id}`, {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        });
        dispatch(success({ redirect: `/question/${answer.questionId}` }));
      } catch (error) {
        dispatch(failure());
      }
    };
  }

export function postAnswer(answer) {
    return async dispatch => {
        dispatch(loading())
        try {
            await fetch(`${URL_BASE}/add`,
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(answer)
                }
            )
            dispatch(success({redirect: `/question/${answer.questionId}`}));
        } catch (error) {
            dispatch(failure())
        }
    }
}

