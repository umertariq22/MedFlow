const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
    const hash = await bcrypt.hash(password, 10)
    return hash;
}

let passwords = ["pasS1234","Pss1234","passS1234"]

passwords.forEach(async (password) => {
    const hash = await hashPassword(password)
    console.log(hash)
});