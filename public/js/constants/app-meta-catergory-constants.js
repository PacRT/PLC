module.exports = {
    "Receipts" : [{
            "Date"  : "date"
        },{
            "Location" : "text"
        },{
            "Receipt Category": {
                "values" : [
                    "Meal","Taxi","Hotel room","Laundry","Airfare"
                ]
            }
        },{
            "Total paid" : "number"
        }
    ],
    "Warranties" : [{
            "Make":"text"
        },{
            "Model" : "text"
        },{
            "Serial Number" : "text"
        },{
            "Date purchased" : "date"
        },{
            "Owner’s name" : "text"
        },{
            "Owner’s address" : "text"
        },{
            "Owner’s email" : "email"
        },{
            "Owner’s address" : "text"
    }],
    "Tax Doc" : [{
        "Tax Doc Type" : {
            "values" : [
                "W2", "W9", "1099"
            ]
        }
        },{
            "Date issued" : "date"
        },{
            "Tax year" : "number"
        }
    ],
    "Edu. Credentials":[{
            "Institute" : "text"
        },{
            "Certificate Title" : "text"
        },{
            " Certificate type" : {
                "values" : [ "Undergrad", "Postgraduate" , "Doctorate" , "Diploma" ]
            }
        }
    ]

}