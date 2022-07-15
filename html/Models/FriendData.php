<?php

require_once ("Models/UserData.php");

// Extends UserData class to add friendship details
class FriendData extends UserData implements JsonSerializable{
    
    protected $_sender, $_status;

    public function __construct($dbRow) {
        parent::__construct($dbRow);
        if ($dbRow["sender"] == $this->_id) {
            $this->_sender = true;
        } else {
            $this->_sender = false;
        }
        $this->_status = $dbRow["status"];
    }

    public function getSender() {
        return $this->_sender;
    }
   
    public function getStatus() {
       return $this->_status;
    }

    public function jsonSerialize(): mixed
    {
        $parent = parent::jsonSerialize();
        $buffer = [
            'sender' => $this->_sender,
            'status' => $this->_status,
        ];
        return array_merge($parent, $buffer);
    }
}