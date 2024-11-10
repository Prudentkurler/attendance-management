"use server"

const fetchAttendees = async () => {


    try {
        const response = await fetch("https://6724c5a7c39fedae05b2a929.mockapi.io/Attendees")
        return response.json()
        
    } catch (error) {
        console.error(error)
    }
    
    }