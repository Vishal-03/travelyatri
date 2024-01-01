import bcrypt from 'bcryptjs';

const errorToString = (e: unknown): string => {
    let err: string = "";
    if (typeof e === "string") {
        err = e.toUpperCase();
    } else if (e instanceof Error) {
        err = e.message;
    }
    return err;
}

export { errorToString };

const isContainSpace = (value: string): boolean => {
    return !value.includes(" ");
}
const hashPassword = async (password: string): Promise<string> => {
    const slat = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, slat);
    return hash;
}

const compairePassword = async (password: string, db_passwprd: string): Promise<boolean> => {
    const isSame = await bcrypt.compare(password, db_passwprd);
    return isSame
}


export { isContainSpace, hashPassword, compairePassword };