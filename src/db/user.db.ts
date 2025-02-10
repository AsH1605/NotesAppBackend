import Joi from 'joi';
import { knex } from './db';
import { User } from '../models/user.model';
import bcrypt from "bcrypt";
import { userAlreadyExistError, userDoesNotExistError, userInvalidEmailError, userInvalidPasswordError, userWrongPasswordError } from '../error/user.error';

const emailSchema = Joi.object({
    email: Joi.string().email({
        tlds: {allow: false}
    }).required()
})

const passwordSchema = Joi.object({
    password: Joi.string().min(2).alphanum().required()
})

export const createUser = async(
    username: string,
    email: string,
    password: string
): Promise<User> => {
    const existingUser = (await knex('server_user').select<User[]>('*').where({username: username}))[0]
    if(existingUser) {
        console.log("user already exists")
        // console.log(existingUser)
        throw userAlreadyExistError
    }
    const emailValidationResult = emailSchema.validate({email})
    if(emailValidationResult.error){
        console.log(emailValidationResult.error)
        throw userInvalidEmailError
    }
    const passwordValidationResult = passwordSchema.validate({password})
    if(passwordValidationResult.error){
        console.log(passwordValidationResult.error)
        throw userInvalidPasswordError
    }
    const encryptedPassword = await bcrypt.hash(password, 10)
    const currentDate = new Date()
    const newUser = await knex('server_user').insert<User>({
        username: username,
        password: encryptedPassword,
        email: email,
        created_at: currentDate,
        last_updated_at: currentDate
    })
    return newUser;
}

export const getUserByUsername = async(username: string): Promise<User> => {
    const existingUser = (await knex('server_user').select<User[]>('*').where({username: username}))[0]
    if(! existingUser) {
        console.log("user does not exist")
        throw userDoesNotExistError
    }
    return existingUser
}

export const getAuthenticatedUser = async(username: string, password: string): Promise<User> => {
    const existingUser = (await knex('server_user').select<User[]>('*').where({username: username}))[0]
    if(! existingUser) {
        console.log("user does not exist")
        throw userDoesNotExistError
    }
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
    // console.log(isPasswordCorrect)
    if(!isPasswordCorrect){
        throw userWrongPasswordError
    }
    return existingUser
}

