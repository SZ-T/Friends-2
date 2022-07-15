<?php

require_once('Models/UserLocationData.php');

class UserData extends UserLocationData implements JsonSerializable{
    
    protected $_email, $_firstName, $_lastName;
    
    public function __construct($dbRow) {
        parent::__construct($dbRow);
        $this->_email = $dbRow['email'];
        $this->_firstName = $dbRow['first_name'];
        $this->_lastName = $dbRow['last_name'];
    }

    public function getEmail() {
        return $this->_email;
    }
   
    public function getFirstName() {
       return $this->_firstName;
    }
    
    public function getLastName() {
       return $this->_lastName;
    }
    
    public function jsonSerialize(): mixed
    {
        $parent = parent::jsonSerialize();
        $buffer = [
            'email' => $this->_email,
            'firstName' => $this->_firstName,
            'lastName' => $this->_lastName,
        ];
        return array_merge($parent, $buffer);
    }
}


