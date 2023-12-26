import { UserService } from "../user.service";
import { CreateUserComponent } from "./create-user.component";
import {TestBed} from "@angular/core/testing";
import {HttpClientModule} from "@angular/common/http";
import {UserRequest} from "../UserRequest";
import {of} from "rxjs";

describe('CreateUserComponent', () => {
    let component: CreateUserComponent;
    let userService: UserService;


    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [UserService]
        })
            .compileComponents();
        userService = TestBed.inject(UserService);
        component = new CreateUserComponent(userService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should handle successful user creation', () => {
        const mockUserRequest: UserRequest = {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'johnDoe@isep.ipp.pt',
          password: 'Passw@rdTest1',
          nif: '123456789',
          phoneNumber: '912345678',
        }
        spyOn(userService, 'createUserRequest').and.returnValue(of(mockUserRequest));
        spyOn(window, 'alert');
        //act
        component.createUserRequest();
        //assert
        const expectedAlertMessage = new RegExp(
            'Request created successfully\\s*' +
            'First Name: John\\s*' +
            'Last Name: Doe\\s*' +
            'Email: johnDoe@isep.ipp.pt\\s*' +
            'NIF: 123456789\\s*' +
            'Phone Number: 912345678\\s*'
        );
        const actualAlertMessage = (window.alert as jasmine.Spy).calls.mostRecent().args[0];
        expect(actualAlertMessage).toMatch(expectedAlertMessage);
    });
});
