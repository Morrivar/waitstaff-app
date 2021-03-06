const STORE = {
  tipTotal: 0,
  mealCount: 0
};

function generateCustCharges(subtotal,tip,total) {
  return `<h2>Customer Charges</h2>
          <p>Subtotal: $${subtotal}</p>
          <p>Tip: $${tip}</p>
          <hr class="line"> 
          <p>Total: $${Number(total.toFixed(2))}</p>`;
}

function generateEarningsInfo(tipPerMeal) {
  return `<h2>My Earnings Info</h2>
          <p>Tip Total: $${Number(STORE.tipTotal.toFixed(2))}</p>
          <p>Meal Count: ${Number(STORE.mealCount.toFixed(2))}</p>
          <p>Average Tip Per Meal: $${tipPerMeal}</p>
          <form id="resetForm">
            <fieldset>
              <button type="submit" id="resetEverything">Reset</button>
            </fieldset>
          </form>`;
}

function calculateCharges(baseMealPrice,taxRate,tipPercent) {
  let subtotal = baseMealPrice * taxRate + baseMealPrice,
    tip = tipPercent * baseMealPrice;

  //This rounds the variables to two decimal places
  subtotal = Number(subtotal.toFixed(2));
  tip = Number(tip.toFixed(2));

  const total = subtotal + tip;

  //Rounding again when adding to be safe
  STORE.tipTotal += Number(tip.toFixed(2));

  return [subtotal, tip, total];
}


/**
 * 
 * @param {Number} baseMealPrice 
 * @param {Number} taxRate 
 * @param {Number} tipPercent 
 */

function renderCustCharges(baseMealPrice,taxRate,tipPercent) {
  const calculatedCarges = calculateCharges(baseMealPrice,taxRate,tipPercent),
    html = generateCustCharges(...calculatedCarges);

  $('#custCharges').html(html);
}

function calculateEarningsInfo() {
  const tipTotal = STORE.tipTotal,
    mealCount = STORE.mealCount;

  if (mealCount > 0) {
    const tipPerMeal = tipTotal / mealCount;

    return Number(tipPerMeal.toFixed(2));

  } else {
    return 0;
  }
}

function renderEarningsInfo() {
  const calculatedEarnings = calculateEarningsInfo(),
    html = generateEarningsInfo(calculatedEarnings);

  $('#earningsInfo').html(html);
}

function handleSubmitMealDetails() {
  $('#mealDetails').on('submit', event => {
    event.preventDefault();

    const baseMealPrice = Number($('#basePrice').val()),

      //Takes whole-number % inputs and converts them to decimals
      taxRate = Number($('#taxRate').val())/100,
      tipPercent = Number($('#tipPercent').val())/100;

    STORE.mealCount++;

    renderCustCharges(baseMealPrice,taxRate,tipPercent);
    renderEarningsInfo();
  });
}
function resetEverything() {
  STORE.tipTotal = 0;
  STORE.mealCount = 0;

  renderCustCharges(0,0,0);
  renderEarningsInfo();
}

function handleResetEverything() {
  $('#resetForm').on('submit', resetEverything());
}

function appHandlers() {
  handleSubmitMealDetails();
  handleResetEverything();
}

$(appHandlers);

