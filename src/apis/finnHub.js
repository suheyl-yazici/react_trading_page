import axios from "axios";

const TOKEN = "cdgm9e2ad3i2r3759q0gcdgm9e2ad3i2r3759q10";

export default axios.create({
    baseURL: 'https://finnhub.io/api/v1',
    params: {
        token: TOKEN
    }
})

