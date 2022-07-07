import { UseGuards } from '@nestjs/common';
import { Args, Field, InputType, Mutation, ObjectType, Resolver } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';
import { GraphQLGuard } from '../guards/gql.guard';
import { AuthService } from './auth.service';

@InputType()
export class LoginInput {
    @Field()
    username: string;

    @Field()
    password: string;
}

@ObjectType()
export class LoginOutput {
    @Field()
    access_token: string;
}

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) { }

    @Mutation(returns => LoginOutput)
    @UseGuards(GraphQLGuard)
    login( @Args('loginData') loginData: LoginInput) {
        return this.authService.loginUser(loginData.username, loginData.password);
    }
}