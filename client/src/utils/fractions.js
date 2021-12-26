const evalFrac = (numString) => {
    const nums = numString.toString().split(/ +/)

    let res = 0
    for (let i = 0; i < nums.length; i++) {
        const split = nums[i].split('/')
        if (split.length === 1) {
            res += parseInt(split[0] * 100) / 100;
        } else {
            if (parseInt(split[1]) !== 0) {

                let result = parseInt(split[0], 10) / parseInt(split[1], 10)


                result = Math.round(result * 1000) / 1000
                res += result;
            }
        }
    }

    return res
}

module.exports = { evalFrac }