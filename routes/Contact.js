import express from "express";
import Contact from "../model/Contact.js";


const router = express.Router();
// create contact


router.post("/contact", async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        const savedContact = await newContact.save();

        console.log(savedContact);
        res.status(201).json({ msg: "Contact successfully created", data: savedContact });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.emailAddress) {
            res.status(500).json({ msg: "Email is already in use", data: req.body });
        } else {
            res.status(500).json({ msg: "Unable to create new contact", error: error.message });
        }
    }
});
// Get  all contact

router.get("/contact",async(req,res)=>{
    try {
        const  contact=await Contact.find()
        console.log(contact)
        res.status(200).json(contact)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"unable to find any contact "})
    }
})
// get a specific contact

router.get("/contact/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        console.log(id)
        const matchingContact=await Contact.findById(id)
        console.log(matchingContact)
        if (!matchingContact) {
            res.status(404).json({ msg: "Contact not found" });
        } else {
            // Process the matching contact
            res.json(matchingContact);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Contact not found"})
    }
})


// update contact

router.put("/contact/:id",async(req,res)=>{

    try {
        const {firstName,lastName,emailAddress}=req.body
        const id=req.params.id;
        await Contact.findByIdAndUpdate(id,{firstName:firstName,lastName:lastName,emailAddress:emailAddress})
        if(!id){
            res.status(404).json({msg:"contact not fond"})
        }
        else{
            res.status(201).json({msg:"contact updated successfully"})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Contact not found",error:error})
    }
})
    router.get("/search",async(req,res)=>{
        try {
            const searchTerm=req.query.searchTerm
            const searchRegex=new RegExp(searchTerm,"i")// it a regular expression to convert query parameter into lowercase
            const matchingContact=await Contact.find({
                $or:[
                    {
                        firstName:searchRegex
                    },
                    {
                        lastName:searchRegex
                    },
                    {
                        emailAddress:searchRegex
                    }
                ]

                
            })
            console.log(matchingContact)
            if(!matchingContact){
                res.status(404).json({msa:"Contact not found"})
            }else{
                res.status(200).json(matchingContact)
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({msg:"contact not found",error:error})
        }
    })
    router.delete("/contact/:id",async(req,res)=>{
        try {
            const id=req.params.id
           const deletedContact= await Contact.findByIdAndDelete(id)
           console.log(deletedContact)
           if(!deletedContact){
            res.status(404).json({msg:"contact not found"})
           }else{
            res.status(200).json({msg:"Contact deleted successfully"})
           }

        } catch (error) {
            
        }
    })

export default router;
