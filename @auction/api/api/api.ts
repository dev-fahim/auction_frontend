export * from './auctions.service';
import { AuctionsService } from './auctions.service';
export * from './authentication.service';
import { AuthenticationService } from './authentication.service';
export * from './credits.service';
import { CreditsService } from './credits.service';
export * from './passwordReset.service';
import { PasswordResetService } from './passwordReset.service';
export * from './platform.service';
import { PlatformService } from './platform.service';
export * from './products.service';
import { ProductsService } from './products.service';
export * from './userProfiles.service';
import { UserProfilesService } from './userProfiles.service';
export const APIS = [AuctionsService, AuthenticationService, CreditsService, PasswordResetService, PlatformService, ProductsService, UserProfilesService];
