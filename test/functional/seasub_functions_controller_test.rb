require 'test_helper'

class SeasubFunctionsControllerTest < ActionController::TestCase
  setup do
    @seasub_function = seasub_functions(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:seasub_functions)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create seasub_function" do
    assert_difference('SeasubFunction.count') do
      post :create, :seasub_function => @seasub_function.attributes
    end

    assert_redirected_to seasub_function_path(assigns(:seasub_function))
  end

  test "should show seasub_function" do
    get :show, :id => @seasub_function.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @seasub_function.to_param
    assert_response :success
  end

  test "should update seasub_function" do
    put :update, :id => @seasub_function.to_param, :seasub_function => @seasub_function.attributes
    assert_redirected_to seasub_function_path(assigns(:seasub_function))
  end

  test "should destroy seasub_function" do
    assert_difference('SeasubFunction.count', -1) do
      delete :destroy, :id => @seasub_function.to_param
    end

    assert_redirected_to seasub_functions_path
  end
end
