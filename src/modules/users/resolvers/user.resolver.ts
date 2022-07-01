import { Args, ArgsType, Field, Query, Resolver } from '@nestjs/graphql';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@ArgsType()
class UserArgs {
    @Field(type => Number, { nullable: false })
    userId: number;
}

@Resolver(of => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(returns => User)
  async user(@Args() args: UserArgs) {
    return this.userService.findOne(args.userId);
  }
}