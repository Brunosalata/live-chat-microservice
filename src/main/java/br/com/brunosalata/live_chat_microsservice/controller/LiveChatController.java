package br.com.brunosalata.live_chat_microsservice.controller;

import br.com.brunosalata.live_chat_microsservice.domain.ChatInput;
import br.com.brunosalata.live_chat_microsservice.domain.ChatOutput;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

/**
 * @author Bruno Salata Lima
 * github.com/Brunosalata
 */
@Controller
public class LiveChatController {

    @MessageMapping("/new-message")
    @SendTo("/topics/live-chat")
    public ChatOutput newMessage(ChatInput input) {
    return new ChatOutput(HtmlUtils.htmlEscape(input.user() + ": " + input.message()));
    }
}
