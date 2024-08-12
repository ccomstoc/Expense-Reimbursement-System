package com.revature.Project1Backend;

import com.revature.Project1Backend.DAOs.EmployeeDAO;
import com.revature.Project1Backend.DAOs.ReimbursementDAO;
import com.revature.Project1Backend.Models.Employee;
import com.revature.Project1Backend.Models.Reimbursement;
import com.revature.Project1Backend.Services.EmployeeService;
import com.revature.Project1Backend.Services.ReimbursementService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
class Project1BackendApplicationTests {

	@Test
	void contextLoads() {
	}

	@Mock
	EmployeeDAO mockEmployeeDAO;
	@Mock
	ReimbursementDAO mockReimbursementDAO;

	@Spy
	EmployeeService eService = new EmployeeService(mockEmployeeDAO, mockReimbursementDAO);

	@Spy
	ReimbursementService rService = new ReimbursementService(mockReimbursementDAO,mockEmployeeDAO);



	@BeforeEach
	public void setUp(){
		MockitoAnnotations.openMocks(this);
		eService = spy(new EmployeeService(mockEmployeeDAO, mockReimbursementDAO));
		rService = spy(new ReimbursementService(mockReimbursementDAO,mockEmployeeDAO));
	}

	@Test
	public void createEmployeeTest(){
		Employee sentEmployee = new Employee(1,"John", "Doe","jdoe","pass","employee");
		Employee savedEmployee = new Employee(1,"John", "Doe","jdoe","pass","employee");
		//when(mockCarDAO.save(any(Car.class))).thenReturn(returnedCar);
		when(mockEmployeeDAO.save(any(Employee.class))).thenReturn(savedEmployee);
		//
		Employee returnedEmployee = eService.createEmployee(sentEmployee);
		//verify(mockCarDAO, times(1)).save(any(Car.class));
		verify(mockEmployeeDAO,times(1)).save(any(Employee.class));
		assertNotNull(returnedEmployee);
		assertEquals(sentEmployee,returnedEmployee);

	}
	@Test
	public void putReimbursementTest(){
		Employee employee = new Employee(1,"John", "Doe","jdoe","pass","employee");
		Reimbursement updatedReimb = new Reimbursement(1,"pen",2,"APPROVED",employee,1);
		//when(mockUserDAO.findById(1)).thenReturn(Optional.of(new User(1, "placeholderUser", "password", "user")));
		when(mockReimbursementDAO.findById(1)).thenReturn(Optional.of(new Reimbursement(1,"pen",2,"PENDING",employee,1)));
		when(mockReimbursementDAO.save(any(Reimbursement.class))).thenReturn(updatedReimb);

		Reimbursement returnedReimb = rService.putReimbursement(updatedReimb);

		verify(mockReimbursementDAO,times(1)).findById(1);
		verify(mockReimbursementDAO,times(1)).save(any(Reimbursement.class));

		assertNotNull(returnedReimb);
		assertEquals(updatedReimb, returnedReimb);

	}
	@Test
	public void getEmployeeByIdTest(){
		Employee storedEmployee = new Employee(1,"John", "Doe","jdoe","pass","employee");
		when(mockEmployeeDAO.findById(1)).thenReturn(Optional.of(new Employee(1,"John", "Doe","jdoe","pass","employee")));

		Employee returnedEmployee = eService.getEmployeeById(1);

		verify(mockEmployeeDAO,times(1)).findById(1);

		assertNotNull(returnedEmployee);
		assertEquals(storedEmployee,returnedEmployee);

	}



}
