import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error(error);
  }
};

export const matchPass = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}
