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
import { CategorySchema } from './categorySchema';
import { UserSchema } from './userSchema';


export interface ProductSchema { 
    guid: string;
    created: string;
    updated: string;
    is_active: boolean;
    is_verified: boolean;
    verified_by?: UserSchema;
    verification_timestamp?: string;
    min_bid_price?: number;
    bid_starts?: string;
    bid_expires?: string;
    user: UserSchema;
    category?: CategorySchema;
    name: string;
    description?: string;
    is_updatable?: boolean;
}

