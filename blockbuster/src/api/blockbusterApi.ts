import axios from 'axios'

export const blockbusterApi= axios.create({
    baseURL:'http://www.omdbapi.com/'
})