import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { intakeDTO, Posts, signUpDTO } from 'src/app/app.model';
import { UserService } from 'src/app/services/user/user.service';
import * as Highcharts from "highcharts";

@Component({
  selector: 'app-diet-intake',
  templateUrl: './diet-intake.component.html',
  styleUrls: ['./diet-intake.component.scss']
})
export class DietIntakeComponent implements OnInit {

  public minDate: Date = new Date("01/01/1920");
  public maxDate: Date = new Date();
  public signUpDTO!: signUpDTO;
  public intakeDTO!: intakeDTO;

  myRecipeList: any;
  allIngridientList: any;
  dishIngredient: any;
  searchIngredients?: string;
  dishName?: string;
  dishID?: number;
  cookedFoodUnits: any;
  cookedFoodDetails: any;
  totalQuantity: any;
  totalCookedUnit: any;
  ingredientDetails: any;
  showIngredientDetails?: boolean;
  activeCompound: any;
  showRegisterForm?: boolean;
  activityList: any;
  genderList: any;
  lactationList: any;
  pregnantList: any;
  membersList: any;
  selectedMember: any;
  foodTiming: any;
  foodList: any;
  foodUnitList: any;
  foodUnitDetails: any;
  intakeFoodList!: any[];
  energy: any;
  normalNutrients: any;
  priorityNutrients: any;
  showFoodNutrientDetails: any;
  isSelectedRow: any;
  isUpdateFood?: boolean;
  tempUpdate: any;
  totalNutrientPie: any;
  consumedNutrientPie: any;
  dietTimeName: any;
  message: any;
  subscription?: Subscription;
  constructor(private router: Router,
    private userService: UserService,
    private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.getFoodTiming();

  }

  @ViewChild("recipiesList") recipiesList: any;
  recipeListClear(): void {
    this.recipiesList.clear();
  }
  recipekeyword = "foodName";

  @ViewChild("ingridientList") ingridientList: any;
  ingridientListClear(): void {
    this.ingridientList.clear();
  }
  ingridientkeyword = "foodName";
  

  getFoodTiming() {
    this.userService.getFoodTiming().subscribe(data => {
      this.foodTiming = data.responseValue[0].foodTiming;
      this.intakeDTO.currentTime = data.responseValue[0].currentTime[0].time;
      this.intakeDTO.selectedDate = new Date();
      //this.getIntakebyTime();
    });
  }

getFoodList(letter: any) {
  debugger;
    if (this.userService.isEmptyValue(letter)) {
      return;
    }
    if (letter.length < 2) {
      return;
    }
    var obj = new Posts();
    obj.userLoginID = JSON.parse(
      localStorage.getItem("userData") || '{}'
    )[0].UserLoginId;
    obj.prefixText = letter;
    this.userService.getFoodList(obj).subscribe(data => {
      this.foodList = data.responseValue;
    });
  }

  getFoodUnit(obj: any) {
    var newobj = new Posts();
    newobj.userLoginID = JSON.parse(
      localStorage.getItem("userData")|| '{}'
    )[0].UserLoginId;
    newobj.foodId = obj.foodID;
    this.userService.getFoodUnitByFoodId(newobj).subscribe(data => {
      this.foodUnitList = data.responseValue;
       
    });
  }
   
  getFoodSpecificNutrient() {
    console.log(this.showFoodNutrientDetails);
    console.log(this.isUpdateFood);
    if (this.showFoodNutrientDetails && !this.isUpdateFood) {
      if (!this.userService.isEmptyValue(this.intakeDTO.newDish) && !this.userService.isEmptyValue(this.intakeDTO.foodUnit.id)) {
        var obj = new Posts();
        obj.userLoginID = JSON.parse(localStorage.getItem('userData') || '{}')[0].UserLoginId;
        obj.memberId = JSON.parse(localStorage.getItem("selectedUser") || '{}').Id;
        obj.foodId = this.intakeDTO.newDish.foodID;
        obj.foodQuantity = parseFloat(this.intakeDTO.foodQuantity);
        obj.foodUnitId = this.intakeDTO.foodUnit.id;
        obj.nutrientType = "AllNutrients";
        this.userService.getFoodSpecificNutrient(obj).subscribe(data => {
          this.energy = data.responseValue[0].energy[0];
          this.normalNutrients = data.responseValue[0].normalNutrients;
          this.priorityNutrients = data.responseValue[0].priorityNutrients;
          if (this.intakeFoodList.length > 0) {
            this.totalNutrientPie = [
              {
                innerSize: "60%",
                zMin: 0,
                name: "Nutrients",
                data: [
                  {
                    name: this.priorityNutrients[0].nutrientName,
                    y: Number(this.priorityNutrients[0].targetNew)
                  },
                  {
                    name: this.priorityNutrients[1].nutrientName,
                    y: Number(this.priorityNutrients[1].targetNew)
                  },
                  {
                    name: this.priorityNutrients[2].nutrientName,
                    y: Number(this.priorityNutrients[2].targetNew)
                  },
                  {
                    name: this.priorityNutrients[3].nutrientName,
                    y: Number(this.priorityNutrients[3].targetNew)
                  }
                ]
              }
            ];

            this.consumedNutrientPie = [
              {
                minPointSize: 20,
                innerSize: "60%",
                zMin: 0,
                name: "Nutrients",
                data: [
                  {
                    name: this.priorityNutrients[0].nutrientName,
                    y: Number(this.priorityNutrients[0].consumed)
                  },
                  {
                    name: this.priorityNutrients[1].nutrientName,
                    y: Number(this.priorityNutrients[1].consumed)
                  },
                  {
                    name: this.priorityNutrients[2].nutrientName,
                    y: Number(this.priorityNutrients[2].consumed)
                  },
                  {
                    name: this.priorityNutrients[3].nutrientName,
                    y: Number(this.priorityNutrients[3].consumed)
                  }
                ]
              }
            ];
           // this.getChart(this.totalNutrientPie, this.consumedNutrientPie);
          }
        });
      }
    } else {
      this.energy = this.normalNutrients = this.priorityNutrients = this.totalNutrientPie = this.consumedNutrientPie = null;
    }
  }

}
