import { Args, ArgsType, Field, Query, Resolver } from '@nestjs/graphql';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@ArgsType()
class UserArgs {
    @Field(type => String, { nullable: false })
    username: string;
}

@Resolver(of => User)
export class UserResolver {
    constructor(private userService: UserService) { }

    @Query(returns => User)
    async user(@Args() args: UserArgs) {
        return this.userService.findOneByUsername(args.username);
    }
}