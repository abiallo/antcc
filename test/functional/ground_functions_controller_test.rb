require 'test_helper'

class GroundFunctionsControllerTest < ActionController::TestCase
  setup do
    @ground_function = ground_functions(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:ground_functions)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create ground_function" do
    assert_difference('GroundFunction.count') do
      post :create, :ground_function => @ground_function.attributes
    end

    assert_redirected_to ground_function_path(assigns(:ground_function))
  end

  test "should show ground_function" do
    get :show, :id => @ground_function.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @ground_function.to_param
    assert_response :success
  end

  test "should update ground_function" do
    put :update, :id => @ground_function.to_param, :ground_function => @ground_function.attributes
    assert_redirected_to ground_function_path(assigns(:ground_function))
  end

  test "should destroy ground_function" do
    assert_difference('GroundFunction.count', -1) do
      delete :destroy, :id => @ground_function.to_param
    end

    assert_redirected_to ground_functions_path
  end
end
