import {
  prop,
  getModelForClass,
  modelOptions,
  Severity,
} from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: { collection: "users", strict: true },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
class UserClass {
  @prop({ required: true })
  public first_name!: string;

  @prop({ required: true })
  public last_name!: string;

  @prop({ required: true })
  public email!: string;

  @prop({ required: true })
  public phone?: string;

  @prop({ required: true, default: new Date(Date.now()) })
  public created_at!: Date;
}

const User = getModelForClass(UserClass);

export { UserClass, User };
