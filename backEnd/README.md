# YikanZhang-backend

_**HW3 June 16 (deadline)**_


filled out all the code blocks provided by professor. The server is working as expected, port 5001 is connect not 8000 

![image](https://media.github.khoury.northeastern.edu/user/11226/files/6c1facb6-8013-4e8e-9085-d4f9f3ff90a6)

In addition, route is setup and is able to connect to corresponding APIs. JSON file can be fetched through the provided api in this homework
(http://localhost:5001/api/v1/movies)

![image](https://media.github.khoury.northeastern.edu/user/11226/files/d57183d7-f233-40a6-adb9-1647586090dd)

Challenging portions are all **completed**, please find screenshots below.

**Add Reviews** --
as you can see all the data entries have been successfully added to MongoDB through Insomnia POST request
<img width="1270" alt="Screenshot 2023-06-16 at 9 43 41 AM" src="https://media.github.khoury.northeastern.edu/user/11226/files/3060fdee-ec6d-4645-b3de-e8d9838b7b75">


**Update Reviews** --
the screenshot clearly shown that reviews data in MongoDB have been modified/updated through Insonmia PUT request
![Screenshot 2023-06-16 at 2 32 01 PM](https://media.github.khoury.northeastern.edu/user/11226/files/cd543930-5183-4835-8b0e-5a708ab8a877)

**Delete Reviews** --
using review_id to locate the reviews that needs to be delete. The reviews in MongoDB deleted by using DELETE request in Insomnia
![Screenshot 2023-06-16 at 2 42 33 PM](https://media.github.khoury.northeastern.edu/user/11226/files/535d48cf-ef5b-4c72-ba9f-dc11e034a64c)

screenshots below is to show testing on POST and DELETE functions while IDs do not match the data entries in MongoDB
![image](https://media.github.khoury.northeastern.edu/user/11226/files/cfdc548e-b9c8-402a-838d-bc02f46de445)
![image](https://media.github.khoury.northeastern.edu/user/11226/files/5dc4d605-39e9-4e7e-8ed7-09bffd3b8e9f)
![image](https://media.github.khoury.northeastern.edu/user/11226/files/d2451c12-a86c-4fa0-97c7-2ec8ba751f88)


_**HW2 June 9 (deadline)**_
all files and directories are added as per hw2 instrutions. 
the .gitignore file added to igonre auto add "node_modules" .env and .DS_Store files and binary files.

![image](https://media.github.khoury.northeastern.edu/user/11226/files/dd66a038-06a1-4c7a-869b-56063378403e)

the screenshot shown below is to demonstrate the new dump database "movie_time_db" is added into MongoDB along with the creation 
of new collection under this directory called "reviews"

![image](https://media.github.khoury.northeastern.edu/user/11226/files/eb5940ad-65fe-428a-b194-a493df1edb6d)





