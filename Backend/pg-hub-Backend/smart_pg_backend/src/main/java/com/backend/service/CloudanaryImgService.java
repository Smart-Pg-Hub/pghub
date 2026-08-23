package com.backend.service;
import org.springframework.web.multipart.MultipartFile;

public interface CloudanaryImgService {
	

    String FOLDER_AVATARS = "Pg_Hub/avatars";
    String FOLDER_ID_PROOFS = "Pg_Hub/id_proofs";
    String FOLDER_PROPERTIES = "Pg_Hub/properties";

    String uploadFile(MultipartFile file, String folder);

    void deleteByUrl(String secureUrl);
}
