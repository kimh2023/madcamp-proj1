
///update contacts


        if(thumbnailPath != null && !thumbnailPath.isEmpty()) {
            Bitmap photo = getThumbnailBitmap(thumbnailPath);

            if(photo != null) {
                ops.add(ContentProviderOperation.newInsert(ContactsContract.Data.CONTENT_URI)
                        .withValueBackReference(ContactsContract.Data.RAW_CONTACT_ID, 0)
                        .withValue(ContactsContract.Data.MIMETYPE,ContactsContract.CommonDataKinds.Photo.CONTENT_ITEM_TYPE)
                        .withValue(ContactsContract.CommonDataKinds.Photo.PHOTO, toByteArray(photo))
                        .build());
            }
        }

//add contacts
        if(thumbnailPath != null && !thumbnailPath.isEmpty()) {
            Bitmap photo = getThumbnailBitmap(thumbnailPath);

            if(photo != null) {
                ops.add(ContentProviderOperation.newInsert(ContactsContract.Data.CONTENT_URI)
                        .withValueBackReference(ContactsContract.Data.RAW_CONTACT_ID, 0)
                        .withValue(ContactsContract.Data.MIMETYPE,ContactsContract.CommonDataKinds.Photo.CONTENT_ITEM_TYPE)
                        .withValue(ContactsContract.CommonDataKinds.Photo.PHOTO, toByteArray(photo))
                        .build());
            }
        }
