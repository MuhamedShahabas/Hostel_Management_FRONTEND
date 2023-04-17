import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../App";
import MealPlan from "../../../components/MealPlan";
import {
  admissionActions,
  fetchActiveMealPlans,
} from "../../../store/admission";
import { useEffect, useState } from "react";
import { fetchmealPlansAdmission } from "../../../apiRoutes/staff";
import { Form, Formik } from "formik";
import SelectInput from "../../../components/Form/SelectInput";
import LoadingButton from "../../../components/UI/LoadingButton";
import Button from "../../../components/UI/Button";
import { changeMealPlanSchema } from "../../../schema/student";
import { customPopup } from "../../../helpers/popup";

function MealPlans() {
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const activePlans = useAppSelector(
    (state) => state?.newAdmission?.hostel?.mealPlans
  );

  useEffect(() => {
    dispatch(fetchmealPlansAdmission);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchActiveMealPlans());
  }, [dispatch]);

  const submitHandler = (formData: { mealPlan: string }) => {
    dispatch(admissionActions.addMealPlan(formData.mealPlan));
    customPopup
      .fire({
        title: `Confirm admission ?`,
        icon: "question",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      })
      .then((result) => {
        if (result.isConfirmed) {
          customPopup
            .fire({
              title: `Applied Successfully`,
              icon: "success",
              text: "Once admitted, the chief warden will contact you through your school email.",
              confirmButtonText: "Sure!",
              confirmButtonColor: "#00A300",
            })
            .then((result) => {
              if (result.isConfirmed) {
                dispatch(admissionActions.addMealPlan(formData.mealPlan));
                navigate("/staffs/login");
              }
            });
        }
      });
  };

  const options = activePlans?.map((el: any) => {
    return { value: el._id, text: el.title };
  });

  return (
    <div className="mealPlans-container lg:w-2/3">
      <h1 className="text-center my-3 text-lg">Select a meal plan</h1>
      <div className="flex flex-col md:flex-row lg:justify-around">
        {activePlans?.map((mealPlan: any) => (
          <MealPlan key={mealPlan._id} data={mealPlan} />
        ))}
      </div>
      <Formik
        initialValues={{
          mealPlan: "",
        }}
        validationSchema={changeMealPlanSchema}
        onSubmit={(formData, { setSubmitting }) => {
          setSubmitting(true);
          // For admission
          submitHandler(formData);
          setSubmitting(false);

          //   onSubmit(formData)
          //     .then(({ data: { token, data } }) => {
          //       loginHandler(token, data);
          //       toast.success(`Welcome ${data.name}`);
          //       navigate(navigateTo);
          //     })
          //     .catch(
          //       ({
          //         response: {
          //           data: { message },
          //         },
          //       }) => setMessage(message)
          //     )
          //     .finally(() => setSubmitting(false));
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex mt-4 justify-center gap-4 px-1 mb-3">
            <SelectInput
              label="Choose a meal plan"
              name="mealPlan"
              options={options}
            />

            {isSubmitting ? (
              <LoadingButton className="px-4" />
            ) : (
              <div>
                <Button className="max-h-fit px-4" type="submit">
                  Save
                </Button>
              </div>
            )}
          </Form>
        )}
      </Formik>
      {message && (
        <span className="text-center text-md font-semibold text-red-700">
          {message}
        </span>
      )}
      <button
        className="text-primary text-sm font-bold mt-5 mb-2 max-w-fit mx-auto hover:brightness-150"
        type="button"
        onClick={() => {
          navigate("/students/admission/blocks");
        }}
      >
        ← Back
      </button>
    </div>
  );
}

export default MealPlans;
