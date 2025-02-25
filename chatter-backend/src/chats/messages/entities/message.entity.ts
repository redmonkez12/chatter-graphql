import { Field, ObjectType } from '@nestjs/graphql';
import { Schema } from '@nestjs/mongoose';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
@Schema()
export class Message extends AbstractEntity {
  @Field()
  content: string;

  @Field()
  createdAt: Date;

  @Field(() => User)
  user: User;

  @Field()
  chatId: string;
}
