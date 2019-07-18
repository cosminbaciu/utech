import { API_BASE_URL, POLL_LIST_SIZE, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
         // 'Content-Type': 'application/json',
    })

    if(options.contentType==null) {
        headers.append('Content-Type', 'application/json')
    }

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));

    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getSwagger(){
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "swagger-ui.html",
        method: 'GET'
    })
}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/users/" + username,
        method: 'GET'
    });
}

export function getAllDomains() {
    return request({
        url: API_BASE_URL + "/domains/getAllDomain",
        method: 'GET'
    });
}

export function getLessons() {
    return request({
        url: API_BASE_URL + "/lessons/getAllLessons",
        method: 'GET'
    });
}

export function getLessonsByDomain(id) {
    return request({
        url: API_BASE_URL + "/lessons/getLessonByDomain/"+id,
        method: 'GET'
    });
}

export function getDomains(id) {
    return request({
        url: API_BASE_URL + "/domains/getDomainsByCategory/" + id,
        method: 'GET'
    });
}

export function getMessages() {
    return request({
        url: API_BASE_URL + "/messages/getMessagesByUser",
        method: 'GET'
    });
}

export function getCategories() {
    return request({
        url: API_BASE_URL + "/categories/getAllCategories",
        method: 'GET'
    });
}

export function getScheduledLessons() {
    return request({
        url: API_BASE_URL + "/lessonScheduler/getMyLessonScheduled",
        method: 'GET'
    });
}

export function getNextLessons() {
    return request({
        url: API_BASE_URL + "/lessonScheduler/getNextLessons",
        method: 'GET'
    });
}

export function addLesson(addLessonRequest) {
    return request({
        url: API_BASE_URL + "/lessons/addLesson",
        method: 'POST',
        body: JSON.stringify(addLessonRequest),
    });
}

export function scheduleLesson(lessonScheduler) {
    return request({
        url: API_BASE_URL + "/lessonScheduler/addLessonScheduler",
        method: 'POST',
        body: JSON.stringify(lessonScheduler)
    });
}

export function addLessonRequest(addLessonRequest) {
    return request({
        url: API_BASE_URL + "/lessonRequest/addLessonRequest",
        method: 'POST',
        body: JSON.stringify(addLessonRequest)});
}

export function addReview(review) {
    return request({
        url: API_BASE_URL + "/review/add",
        method: 'POST',
        body: JSON.stringify(review)});
}
export function addLessonPhoto(addLessonPhoto) {
    return request({
        url: API_BASE_URL + "/uploadMultipleFilesForLessons",
        method: 'POST',
        body: addLessonPhoto,
        contentType: 'application/json'
    });
}

export function addTutoringFiles(addLessonPhoto) {
    return request({
        url: API_BASE_URL + "/uploadMultipleTutoringFiles",
        method: 'POST',
        body: addLessonPhoto,
        contentType: 'application/json'
    });
}

export function getProfilePicture() {
    return request({
        url: API_BASE_URL + "/downloadProfilePicture/profile.png",
        method: 'GET'
    });
}

export function getExternalProfilePicture(name) {
    return request({
        url: API_BASE_URL + "/downloadExternalProfilePicture/" + name + "/profile.png",
        method: 'GET'
    });
}

export function getTutoringFiles(name) {
    return request({
        url: API_BASE_URL + "/downloadTutoringFiles",
        body: name,
        method: 'POST'
    });
}

export function getLessonPicture(lessonName) {
    return request({
        url: API_BASE_URL + "/downloadLessonPhoto/" + lessonName,
        method: 'GET'
    });
}

export function getUserPrincipal() {
    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getUser(name) {
    return request({
        url: API_BASE_URL + "/users/"+name,
        method: 'GET'
    });
}

export function getLessonsByKeyword(keyword) {
    return request({
        url: API_BASE_URL + "/lessons/getLessonByKeyword/"+keyword,
        method: 'GET'
    });
}

export function getLessonsByKeywordSearch(keyword) {
    return request({
        url: API_BASE_URL + "/lessons/getLessonByKeywordSearch/"+keyword,
        method: 'GET'
    });
}

export function getUsers() {
    return request({
        url: API_BASE_URL + "/users",
        method: 'GET'
    });
}

export function getTutoringFilesNew() {
    return request({
        url: API_BASE_URL + "/tutoring",
        method: 'GET'
    });
}
