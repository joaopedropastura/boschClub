import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  } catch (error) {
    console.error("Error getting user by email", error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: id,
      },
    });

    return user;
  } catch (error) {
    console.error("Error getting user by id", error);
    return null;
  }
};

export async function createUser(data: any) {
  const user = {
    name: data.name,
    edv: data.edv,
    email: data.email,
    password: data.password,
  };

  const exitstingUser = await db.user.findUnique({
    where: {
      email: user.email,
    },
  });

  try {
    if (exitstingUser) {
      return { message: "User already exists" };
    }

    await db.user.create({
      data: user,
    });
    return { message: "User created" };
  } catch (error) {
    return { message: "Error creating user" + error };
  }
}
