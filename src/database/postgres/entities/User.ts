import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  OneToOne,
  DeleteDateColumn,
  Index,
  ManyToOne,
} from "typeorm";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

@Entity("users")
@Index(["role", "deleted_at", "id"])
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column()
  email!: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  location?: string;

  @Column({ nullable: true, type: "date" })
  birth_date?: Date;

  @Column({
    nullable: true,
    default: "https://i.imgur.com/09iZybx.jpg",
  })
  profile_photo_url?: string;

  @Column({
    type: "enum",
    enum: UserRole,
  })
  role!: UserRole;

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updated_at!: Date;

  @DeleteDateColumn({ type: "timestamptz", nullable: true, select: false })
  deleted_at?: Date;
}
