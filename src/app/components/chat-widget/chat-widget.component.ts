import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MailService, Mail } from '../../services/mail/mail.service';

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.css']
})
export class ChatWidgetComponent {
  isChatOpen = false;
  message = '';
  sending = false;
  quickQuestions = [
    '如何註冊/管理帳號？',
    '如何購買商品？',
    '如何查看訂單狀態？',
    '如何退換貨？',
    '聯絡客服'
  ];
  selectedQuestion : string = '';
  constructor(public mailserver: MailService){}

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }
  
  selectQuestion(question: string) {
    this.selectedQuestion = question;
  }

  send() {
    if(!this.message.trim()) return;
    this.sending = true;
    const mail: Mail = {
      to: 'wops60067@gmail.com', 
      subject: this.selectedQuestion,
      body: this.message
    };
    this.mailserver.SendMail(mail).subscribe({
      next: () => {
        this.message = '';
        this.sending = false;
        alert('已成功發送信件！');
      },
      error: () => {
        this.sending = false;
        alert('寄送失敗，請稍後再試');
      }
    });
  }
}
