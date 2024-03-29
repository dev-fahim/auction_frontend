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
import { ProductSchema } from './productSchema';
import { UserSchema } from './userSchema';


export interface AuctionSchema { 
    guid: string;
    created: string;
    updated: string;
    is_active: boolean;
    created_by?: UserSchema;
    min_bid_price?: number;
    bid_starts?: string;
    bid_expires?: string;
    product: ProductSchema;
    min_required_credit?: number;
    next_bid?: number;
}

