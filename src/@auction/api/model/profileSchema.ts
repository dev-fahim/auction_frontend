/**
 * Auction Core API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { UserTypeEnum } from './userTypeEnum';
import { UserSchema } from './userSchema';


export interface ProfileSchema { 
    guid: string;
    created: string;
    updated: string;
    is_active: boolean;
    is_verified: boolean;
    verified_by?: UserSchema;
    verification_timestamp?: string;
    can_operate_product?: boolean;
    can_attend_auction?: boolean;
    can_login?: boolean;
    user: UserSchema;
    user_type: UserTypeEnum;
}

