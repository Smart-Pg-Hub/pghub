package com.backend.service;

import java.util.List;

import com.backend.dto.req.AddRoomReq;
import com.backend.dto.response.RoomResp;
import com.backend.entity.Room;

public interface RoomService {

	RoomResp addRoom(AddRoomReq request);

	RoomResp getById(Long id);

	List<RoomResp> getAll(Long pgid);

}
