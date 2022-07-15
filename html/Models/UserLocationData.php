<?php

require_once('Models/BasicUserData.php');

class UserLocationData extends BasicUserData implements JsonSerializable{
    
    protected $_latitude, $_longitude;
    
    public function __construct($dbRow) {
        parent::__construct($dbRow);
        $this->_latitude = $dbRow['latitude'];
        $this->_longitude = $dbRow['longitude'];
    }

    public function getLatitude() {
        return $this->_latitude;
    }

    public function getLongitude() {
        return $this->_longitude;
    }

    public function jsonSerialize(): mixed
    {
        $parent = parent::jsonSerialize();
        $buffer = [
            'id'=> $this->_id,
            'username'=> $this->_username,
            'longitude' => $this->_longitude,
            'latitude' => $this->_latitude
        ];
        return array_merge($parent, $buffer);
    }
}


