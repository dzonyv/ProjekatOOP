function myFunction(){
    document.getElementById("korisnik").innerHTML = User.firstName.toString() + " " + User.lastName.toString();
}
var User = {
firstName:"Nikola",
  lastName: "Vlacic",
  
}