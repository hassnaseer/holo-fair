import Vue from 'vue';

Vue.mixin({
    methods: {
        parseJwt(token) {
            if (token) {
                const base64Url = token.split('.')[1]
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                    return `%${(`0  0${c.charCodeAt(0).toString(16)}`).slice(-2)}`
                }).join(''))
                return JSON.parse(jsonPayload)
            }
        },
        capitalizeFirstLetter(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    }
})