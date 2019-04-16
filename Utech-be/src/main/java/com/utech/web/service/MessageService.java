package com.utech.web.service;


import com.utech.web.model.dtos.MessageDTO;
import com.utech.web.model.domain.Message;
import com.utech.web.repository.LessonRepository;
import com.utech.web.repository.LessonRequestRepository;
import com.utech.web.repository.MessageRepository;
import com.utech.web.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
public class MessageService {


    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private LessonRequestRepository lessonRequestRepository;

    @Autowired
    private UserRepository userRepository;

    public void addMessage(Long userId, Long lessonId, Timestamp date, Long lessonRequestId){

        Message message = new Message();
        message.setUserId(lessonRepository.findById(lessonId).get().getUserId());
        message.setSenderId(userId);

        message.setMessage("<p>Am trimis solicitare pentru lectia " + lessonRepository.findById(lessonId).get().getName() + ", pentru data " + date.toString() + ". Esti de acord, sau reprogramam? </p>");
        message.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        message.setLessonRequestId(lessonRequestId);

        messageRepository.save(message);
    }

    public List<MessageDTO> getMessagesByUser(Long id){

        return convertMessageListToMEssageDTOList(messageRepository.findAllByUserId(id));
    }

    private List<MessageDTO> convertMessageListToMEssageDTOList(List<Message> messageList){

        List<MessageDTO> messageDTOList = new ArrayList<>();
        for(Message message : messageList)
            messageDTOList.add(convertMessageToMessageDTO(message));

        return messageDTOList;

    }

    private MessageDTO convertMessageToMessageDTO(Message message){

        MessageDTO messageDTO = new MessageDTO();

        messageDTO.setId(message.getId());
        messageDTO.setUserId(message.getUserId());
        messageDTO.setMessage(message.getMessage());
        messageDTO.setCreatedAt(message.getCreatedAt());
        messageDTO.setLessonRequestId(message.getLessonRequestId());

        String senderName = userRepository.findById(message.getSenderId()).get().getName();

        messageDTO.setDate(lessonRequestRepository.findById(message.getLessonRequestId()).get().getDate());

        messageDTO.setSenderName(senderName);

        return messageDTO;

    }
}
