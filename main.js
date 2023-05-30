const AllPlans = document.querySelectorAll('.plan')
const PricingSlider = document.querySelector('.slide')
const ArcadePrice = document.querySelector('.arcade-price')
const AdvancedPrice = document.querySelector('.advanced-price')
const ProPrice = document.querySelector('.pro-price')
const MonthlyPrices = ['$9/mo','$12/mo','$15/mo']
const YearlyPrices = ['$90/yr','$120/yr','$150/yr']
const MonthlyLabel = document.querySelector('.monthly-label')
const YearlyLabel = document.querySelector('.yearly-label')
const GoBackBtn = document.querySelector('.go-back-btn')
const NextStepBtn = document.querySelector('.next-step-btn')
const StepNumbers = document.querySelectorAll('.step-numbers .step')
const FormSteps = document.querySelectorAll('form .step')
const AllAddons = document.querySelectorAll('form .step3 .add-ons .add-on')
const OnlineServicePrice = document.querySelector('.online-service-price')
const StoragePrice = document.querySelector('.storage-price')
const CustomizeProfilePrice = document.querySelector('.customize-profile-price')
const NameInput = document.querySelector('.name-input')
const EmailInput = document.querySelector('.email-input')
const PhoneInput = document.querySelector('.phone-input')
const NameError = document.querySelector('.name-error')
const EmailError = document.querySelector('.email-error')
const PhoneError = document.querySelector('.phone-error')
const ConfirmBtn = document.querySelector('footer button.confirm-btn')
const ChangePlanBtn = document.querySelector('.change-plan-btn')
const SummaryContent = document.querySelector('.summary')
const Footer = document.querySelector('footer')

let isNameValid = false
let isEmailValid = false
let isPhoneValid = false
let choosenPayment = 'Yearly'
let currentStep = 1
let selectedPlan = null
let selectedAddons = []



AllPlans.forEach(plan => {
    plan.addEventListener('click', () => {
        plan.classList.add('selected-plan')
        //loop over the others and remove the selected class
        AllPlans.forEach(otherPlan => {
            if(otherPlan != plan)
            {
                otherPlan.classList.remove('selected-plan')
            }
        })
    })
})


ChangePlanBtn.addEventListener('click', () => {
    currentStep = 2
    selectedAddons = []
    selectedPlan = null
    //clear the old divs
    let oldDivs = document.querySelectorAll('form .step4 .finishing-up .choosen-ad-ons .ad-on')
    console.log(oldDivs)
    oldDivs.forEach(div => {
        div.remove()
    })
    UpdateFormStep()
    StepNumbers.forEach(step => {
        step.dataset.selected = false
    })
    StepNumbers[1].dataset.selected = true
})


ConfirmBtn.addEventListener('click', () => {
    SummaryContent.style.display = 'flex'
    const step4Elements = document.querySelectorAll('form .step4 h1, form .step4 > p, form .step4 .finishing-up');
    step4Elements.forEach(element => {
    element.style.display = 'none';
    Footer.style.display = 'none'
    
});
})

PricingSlider.addEventListener('click', () => {
    const check = PricingSlider.classList.contains('monthly')
    if(check)
    {
      PricingSlider.classList.remove('monthly')
      PricingSlider.classList.add('yearly')
      ArcadePrice.innerHTML = MonthlyPrices[0]
      AdvancedPrice.innerHTML = MonthlyPrices[1]
      ProPrice.innerHTML = MonthlyPrices[2]
      choosenPayment = 'Monthly'
    }
    else
    {
      PricingSlider.classList.remove('yearly')
      PricingSlider.classList.add('monthly')
      ArcadePrice.innerHTML = YearlyPrices[0]
      AdvancedPrice.innerHTML = YearlyPrices[1]
      ProPrice.innerHTML = YearlyPrices[2]
      choosenPayment = 'Yearly'
    }
    MonthlyLabel.classList.toggle('selected-payment-option')
    YearlyLabel.classList.toggle('selected-payment-option')
    UpdateStep3Prices()
    console.log(choosenPayment)
});


function UpdateStep3Prices()
{
    if(choosenPayment == 'Monthly')
    {
        OnlineServicePrice.innerHTML = '+1$/mo'
        StoragePrice.innerHTML = '+2$/mo'
        CustomizeProfilePrice.innerHTML = '+2$/mo'
    }
    else
    {
        OnlineServicePrice.innerHTML = '$10/yr'
        StoragePrice.innerHTML = '$20/yr'
        CustomizeProfilePrice.innerHTML = '$20/yr'
    }
}

NameInput.addEventListener('input', () => {
    //check the name length
    console.log(NameInput.value.length)
    if(NameInput.value.length < 3)
    {
        NameError.innerHTML = 'Name must be at least 3 characters'
        NameInput.classList.add('error')
        isNameValid = false
    }
    else
    {
        NameError.innerHTML = ''
        NameInput.classList.remove('error')
        isNameValid = true
    }
})

EmailInput.addEventListener('input', () => {
    const EmailRegex = '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'
    if(!EmailInput.value.match(EmailRegex))
    {
        EmailError.innerHTML = 'Please enter a valid email'
        EmailInput.classList.add('error')
        isEmailValid = false
    }
    else
    {
        EmailError.innerHTML = ''
        EmailInput.classList.remove('error')
        isEmailValid = true
    }
})

PhoneInput.addEventListener('input', () => {
    const PhoneRegex = '^[+][0-9]{1,3} [0-9]{3} [0-9]{3} [0-9]{3}$'
    if(!PhoneInput.value.match(PhoneRegex))
    {
        PhoneError.innerHTML = 'Please enter a valid phone number'
        PhoneInput.classList.add('error')
        isPhoneValid = false
    }
    else
    {
        PhoneError.innerHTML = ''
        PhoneInput.classList.remove('error')
        isPhoneValid = true
    }
})

function ValidateStep2() {
    let isStepValid = false
    AllPlans.forEach(plan => {
        if(plan.classList.contains('selected-plan'))
        {
            isStepValid = true
            let name = plan.querySelector('.plan-details span:first-child').innerHTML
            let price = plan.querySelector('.plan-details span:nth-child(2)').innerHTML
            selectedPlan = {name, price}
        }
    })
    return isStepValid
}

function ValidateStep3() {
    let isStepValid = false
    AllAddons.forEach(addon => {
        if(addon.classList.contains('selected'))
        {
            isStepValid = true
            let name = addon.querySelector('.add-on-details span:first-child').innerHTML
            let price = addon.querySelector('.add-on-price span').innerHTML
            //check if it already exists in the array
            let exists = false
            selectedAddons.forEach(selectedAddon => {
                if(selectedAddon.name == name)
                 exists = true
            })
            if(!exists)
             selectedAddons.push({name, price})
        }
    })
    return isStepValid
}

function handleStep4()
{
    //clear the old divs
    let oldDivs = document.querySelectorAll('form .step4 .finishing-up .choosen-ad-ons .ad-on')
    console.log(oldDivs)
    oldDivs.forEach(div => {
        div.remove()
    })
    const priceRegex = /\d+/;
    NextStepBtn.style.display = 'none'
    ConfirmBtn.style.display = 'block'
    let PlanName = document.querySelector('form .step4 .finishing-up .choosen-plan .plan-details span')
    let PlanPrice = document.querySelector('form .step4 .finishing-up .choosen-plan .plan-price span')
    let ChoosenAdonsDiv = document.querySelector('form .step4 .finishing-up .choosen-ad-ons')
    PlanName.innerHTML = selectedPlan.name + ' (' + choosenPayment + ')'
    PlanPrice.innerHTML = selectedPlan.price
    let totalPrice = 0
    let planPrice = parseInt(selectedPlan.price.match(priceRegex)[0])
    totalPrice += planPrice
    selectedAddons.forEach(addon => {
        let addonPrice = parseInt(addon.price.match(priceRegex)[0])
        totalPrice += addonPrice
        let AddonDiv = document.createElement('div')
        AddonDiv.classList.add('ad-on')
        let firstSpan = document.createElement('span')
        firstSpan.innerHTML = addon.name
        let secondSpan = document.createElement('span')
        secondSpan.innerHTML = addon.price
        AddonDiv.appendChild(firstSpan)
        AddonDiv.appendChild(secondSpan)
        ChoosenAdonsDiv.appendChild(AddonDiv)
    })
    let totalDiv = document.createElement('div')
    totalDiv.classList.add('ad-on')
    let firstSpan = document.createElement('span')
    let keyword = ''
    if(choosenPayment === 'Monthly')
        keyword = 'per month'
    else
        keyword = 'per year'
    firstSpan.innerHTML = 'Total (' + keyword + ')'
    let secondSpan = document.createElement('span')
    secondSpan.innerHTML = '$' + totalPrice + '/' + keyword
    totalDiv.appendChild(firstSpan)
    totalDiv.appendChild(secondSpan)
    ChoosenAdonsDiv.appendChild(totalDiv)
}

function ValidInputs() {
    if(currentStep === 1)
        return isNameValid && isEmailValid && isPhoneValid
    if(currentStep === 2)
        return ValidateStep2()
    if(currentStep === 3)
        return ValidateStep3()
    return true
    
}

NextStepBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if(currentStep == 4) return 
    if(!ValidInputs()) return
    const previousNumber = StepNumbers[currentStep - 1]
    const number = StepNumbers[currentStep]
    previousNumber.dataset.selected = 'false'
    number.dataset.selected = 'true'
    currentStep++
    if(currentStep > 1)  GoBackBtn.classList.add('show')
    UpdateFormStep()
    if(currentStep == 4) handleStep4()
    console.log(selectedPlan, selectedAddons)
})

GoBackBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if(currentStep == 1) return 
    const previousNumber = StepNumbers[currentStep - 1]
    const number = StepNumbers[currentStep - 2]
    previousNumber.dataset.selected = 'false'
    number.dataset.selected = 'true'
    currentStep--
    if(currentStep == 1) GoBackBtn.classList.remove('show')
    UpdateFormStep()
})

function UpdateFormStep() {
    FormSteps.forEach(step => {
        step.style.display = 'none'
    })
    if(currentStep != 4)
    {
        NextStepBtn.style.display = 'block'
        ConfirmBtn.style.display = 'none'
    }
    FormSteps[currentStep - 1].style.display = 'block'
}


AllAddons.forEach(addon => {
    addon.addEventListener('click', () => {
        addon.classList.toggle('selected')
    })
})