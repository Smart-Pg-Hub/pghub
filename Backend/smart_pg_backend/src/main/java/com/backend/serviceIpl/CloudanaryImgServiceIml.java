package com.backend.serviceIpl;

import java.io.IOException;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.backend.service.CloudanaryImgService;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class CloudanaryImgServiceIml implements CloudanaryImgService {

private final Cloudinary cloudinary;

private static final Pattern CLOUDINARY_URL_PATTERN =
        Pattern.compile("/(image|video|raw)/upload/(?:v\\d+/)?(.+?)(?:\\.[a-zA-Z0-9]+)?$");

@Override
public String uploadFile(MultipartFile file, String folder) {

    if (file == null || file.isEmpty()) {
        return null;
    }

    try {

        Map<?, ?> uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap(
                        "folder", folder,
                        "resource_type", "auto"
                )
        );

        return (String) uploadResult.get("secure_url");

    } catch (IOException e) {
        log.error("Cloudinary upload failed for folder {}", folder, e);
        throw new RuntimeException("File upload failed");

    } catch (RuntimeException e) {
        log.error("Cloudinary rejected the upload for folder {}", folder, e);
        throw new RuntimeException("File upload failed: " + e.getMessage());
    }
}

@Override
public void deleteByUrl(String secureUrl) {

    if (secureUrl == null || secureUrl.isBlank()) {
        return;
    }

    Matcher matcher = CLOUDINARY_URL_PATTERN.matcher(secureUrl);

    if (!matcher.find()) {
        log.warn("Could not parse Cloudinary public_id from URL: {}", secureUrl);
        return;
    }

    String resourceType = matcher.group(1);
    String publicId = matcher.group(2);

    try {

        cloudinary.uploader().destroy(
                publicId,
                ObjectUtils.asMap(
                        "resource_type", resourceType
                )
        );

    } catch (Exception e) {
        log.warn(
                "Could not delete Cloudinary asset {}: {}",
                publicId,
                e.getMessage()
        );
    }
}

}