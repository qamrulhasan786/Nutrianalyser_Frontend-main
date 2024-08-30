export class Posts {
    prefixText: any;
    userId?: number;
    userLoginID?: number;
    memberName: any;
    memberId?: number;
    genderId?: number;
    address: any;
    dob: any;
    height?: number;
    weight?: number;
    activity?: number;
    isPregnant?: number;
    pregnantCondition?: number;
    islactation?: number;
    lactationCondition?: number;
    foodId?: number;
    foodGroupId?: number;
    Ingredient: any;
    ingredientId?: number;
    cookedFoodQty?: number;
    cookedFoodQtyUnit: any;
    ingredientQuantity: any;
    ingredientUnit: any;
    queryType?: string;
    newDish: any;
    foodQuantity: any;
    foodUnitId: any;
    intakeDate: any;
    foodTime: any;
    foodTimeId: any;
    nutrientType?: string;
    dietId?: number;
    date:any;
    medicationID:any;
    intakeTime:any;
    medicineStrengthID:any;
    searchKeyword:any;
    intakeTimeID:any;
    medicineID:any;
    brandID:any;
    doseStrength:any;
    doseQuantity:any;
    doseUnitID:any;
    userMedicationID:any;
    dietType:any;
    problemDate:any;
    problemID:any;
    problemTimeFrom:any;
    problemTimeTo:any;
    userProblemID:any;
    userActivityID:any;
    activityDate:any;
    activityID:any;
    rating:any;
    activityTimeFrom:any;
    activityTimeTo:any;
    oldPassword:any;
    newPassword:any;
    filePath:any;
    imagePath:any;
    userToken: any;
    sessionID: any;
    copyDate: any;
    isSupplement?: boolean;
    noOfRedeemCoins: any;
    opCode?: number;
    coinActivityId?: number;
    nutrientName?: string;
    couponCode?: string;
    description?: string;
    discountPercentage:any;
    discountInRs?: number;
    maxDiscount?: number;
    minimumCartValue:any;
    couponType?: number;
    mobileNo?: number;
  }
  
  export class loginDTO {
    loginCountry?: number;
    username: any;
    password: any;
  }
  
  export class signUpDTO {
    token: any;
    signUpCountry?: number;
    signUpMobile?: number;
    fullName?: String;
    email: any;
    password: any;
    OTP?: number;
    OTPID?: number;
    isLactation?: number;
    isPregnant?: number;
    gender?: number;
    dob: any;
    height: any;
    weight: any;
    activityType?: number;
    pregnantType?: number;
    lactationType?: number;
  }
  
  export class familyDTO {
    fullName?: String;
    isLactation?: number;
    isPregnant?: number;
    gender?: number;
    dob: any;
    height?: number;
    weight?: number;
    activityType?: number;
    pregnantType?: number;
    lactationType?: number;
    address: any;
    memberID?: number;
  }
  
  export class intakeDTO {
    selectedDate: any;
    newDish: any;
    foodQuantity: any;
    foodUnit: any;
    mealTime: any;
    selectedDayTime: any;
    currentTime: any;
    selectedDayTimeForAdd?: number;
  }
  
  export class medIntakeDTO {
    selectedDate: any;
    newMed: any;
    selectedTime: any;
  }
  
  export class supIntakeDTO {
    selectedDate: any;
    newSup: any;
    selectedTime: any;
    selectedDayTime:any;
  }
  
  export class probIntakeDTO {
    selectedDate: any;
    newProb: any;
    selectedTimeTo: any;
    selectedTimeFrom: any;
  }
  
  export class activityDTO {
    selectedDate: any;
    newActivity: any;
    selectedTimeTo: any;
    selectedTimeFrom: any;
    activityID:any;
    moodRating:any;
  }
  
  export class ingredientsDTO {
    id: any;
    foodName: any;
    foodGroupID: any;
    displayOrder: any;
    foodCategoryID: any;
    categoryname: any;
  }
  export class recipeByUserDTO {
    userId?: number;
    userLoginID?: number;
    memberId?: number;
    recipeByUserJSON?: string;
    ingredientsByUserJSON?: string;
    id?: number;
    foodGroupId?: number;
    foodName?: string;
    prefixText?: string;
    recipeMainId?: number;
    foodId?: number;
  }
  export class ShareRecipe extends  recipeByUserDTO{
    mobileNo?: string;
    shareTo?: number;
    name?: string;
  }
  
  export class UserRecipe {
    recipeId?: number;
    ingredientId?: number;
    ingredientQuantity?: number;
    unitID?: number;
  }
  
  export class SmartTable {
    userId?: number;
    userLoginID?: number;
    memberID?: number;
    smartTableID?: number;
    smartTableContainerID?: number;
    intakeDateTime?: string;
    smartTableName?: string;
    smartTableContainerName?: string;
  }
  export class CaloriesBurning {
    userId?: number;
    userLoginID?: number;
    memberID?: number;
    activityID?: number;
    caloriesBurnt?: number;
    caloriesBurntID?: number;
    parameterList?: string;
  }
  
  export class BlogPost {
    userId?: number;
    userLoginID?: number;
    memberID?: number;
    blogID?: number;
    blogTitle?: string;
    slug?: string;
    blogDetail?: string;
    blogImage?: string;
    blogImageRaw?: string;
    blogDate?: string;
    blogPostTypeID?: number;
    blogPostType?: string;
    commentID?: number;
    parentCommentID?: number;
    comment?: string;
    blogDateFormated?: string;
    opCode?: number;
    isFavourite?: boolean;
  }
   