/**
 * Pulls reservations in a .txt format from the cloud, then packages it into a JSON string ready for export.
 *
 * @summary (server side) pull reservations from the cloud to the barn
 * @author Team RAMP
 *
 * Created at     : 2025-10-09 16:10:33 
 * Last modified  : 2025-11-05 15:07:48
 */

/* USAGE EXAMPLE: (Put pullReservations.js in the same directory):
const {getBlockedGridCells} = require("./pullReservations");

getBlockedGridCells().then((blockedGridCells) => console.log(blockedGridCells));
*/

const url = "https://outlook.office365.com/owa/calendar/75d0232ceddf4f828033e6a779959f3c@duke.edu/0cb25b834cb64c5c861694ecac1742719917129477624664964/calendar.ics";

const runDate = new Date();
const dateYYYYMMDD = parseInt(runDate.toLocaleDateString("en-GB").split("/").reverse().join("")); // gets a new date in DD MM YYYY, then splits, reverses, and joins to put it in YYYYMMDD format that ICS uses
//const dateYYYYMMDD = "20251029";

/**
 * Parse an ICS date string (YYYYMMDDTHHMMSSZ) and return the date in number YYYYMMDD format.
 * @param {String} dateString 
 * @returns {Number} The date in YYYYMMDD format
 */
function parseICSDateString(dateString) {
    let YYYYMMDD = parseInt(dateString.substr(0, 8));
    return YYYYMMDD;
}

/**
 * Send a GET request to the ICS calendar URL and parse the blocked grid cells.
 * 
 * This method should remain accurate given consistent correct input until years nearing 9.00719925 * 10^11. At that point, I sure hope this system has been replaced.
 *
 * @async
 * @returns {Promise<Array<string>>} A promise that resolves to an array of blocked grid cell identifiers.
 */
async function getBlockedGridCells() {
    try{
        let res = await fetch(url);
        let d = await res.text();

        let events = d.split("END:VEVENT");
        let blockedCells = [];
        for (let event of events) {
            eventData = "";
            propertyCount = 0;

            if (!event.includes("BEGIN:VEVENT")) continue;

            let startDateString = event.split("DTSTART;")[1].split("\n")[0].split(":")[1]; // Parse the ICS entry for the DaTe (START) and ignore the timezone (between ; and :)
            let endDateString = event.split("DTEND;")[1].split("\n")[0].split(":")[1]; // Parse the ICS entry for the DaTe (END) and ignore the timezone (between ; and :)

            let startDate = parseICSDateString(startDateString);
            let endDate = parseICSDateString(endDateString);

            //console.log(event);

            let location = event.split("LOCATION:")[1].split("\nX-")[0];
            if (location != null && location.length > 0) {
                //console.log(`Processing event from ${startDate} to ${endDate} at location ${location}`);
                location = location.split("\\").join("");
                if ((startDate <= dateYYYYMMDD && endDate >= dateYYYYMMDD) || startDate == null || endDate == null) {
                    let eventCells = location.split(/(?:,|;| )+/); // Split by any combination of comma, semicolon, or spaces
                    for (let cell of eventCells) {
                        blockedCells.push(cell.trim());
                    }
                }
            }
        }
        
        return blockedCells.sort();
    } catch (error) {
        console.error("Error fetching or processing ICS data:", error);
        return ["ERROR; CHECK CALENDAR FOR BLOCKED CELLS"];
    }
}

module.exports = { getBlockedGridCells };
