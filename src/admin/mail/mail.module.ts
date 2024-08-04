import { Module } from "@nestjs/common";
import { SendMailService } from "./sendmail.service";

@Module({
    providers:[SendMailService],
    exports:[SendMailService]
})
export class MailModule{}