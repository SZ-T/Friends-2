<?php

class BasicUserData implements JsonSerializable{
    
    protected $_id, $_username, $_image;
    
    public function __construct($dbRow) {
        $this->_id = $dbRow['id'];
        $this->_username = $dbRow['username'];
        $this->_image = $dbRow['profile'];
    }

    public function getID() {
        return $this->_id;
    }
    
    public function getUsername() {
       return $this->_username;
    }
    
    public function getImage(): string
    {
        if ($this->_image) {
            return 'images/profile/'.$this->getID().'.png';
        } else {
            return 'images/profile/0.png';
        }
    }

    public function jsonSerialize(): mixed
    {
        return [
            'id' => $this->_id,
            'username' => $this->_username,
            'image' => $this->getImage()
        ];
    }
}


