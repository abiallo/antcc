require 'test_helper'

class AirFunctionsControllerTest < ActionController::TestCase
  setup do
    @air_function = air_functions(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:air_functions)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create air_function" do
    assert_difference('AirFunction.count') do
      post :create, :air_function => @air_function.attributes
    end

    assert_redirected_to air_function_path(assigns(:air_function))
  end

  test "should show air_function" do
    get :show, :id => @air_function.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @air_function.to_param
    assert_response :success
  end

  test "should update air_function" do
    put :update, :id => @air_function.to_param, :air_function => @air_function.attributes
    assert_redirected_to air_function_path(assigns(:air_function))
  end

  test "should destroy air_function" do
    assert_difference('AirFunction.count', -1) do
      delete :destroy, :id => @air_function.to_param
    end

    assert_redirected_to air_functions_path
  end
end
