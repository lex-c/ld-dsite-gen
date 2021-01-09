import pandas as pd;
import numpy as np;
from sklearn.model_selection import train_test_split, cross_validate;
from sklearn import svm, preprocessing;
from sklearn.linear_model import LinearRegression;
from sklearn.metrics import accuracy_score;
import math;

def clean_db_data(pics_from_db):
    d = {  }
    for tup in pics_from_db:
        obj = { tup[0]: {tup[1]:tup[2]} }
        if tup[0] in d.keys():
            d[tup[0]].append(obj[tup[0]])
        else:
            d[tup[0]] = [obj[tup[0]]]
    arr = []
    for k in d.keys():
        arr.append((k, d[k]))
    all_features_arrs = [sub_arr[1] for sub_arr in arr]
    all_features_dicts = [tag for sublist in all_features_arrs for tag in sublist]
    all_features_doubles = [list(item.keys())[0] for item in all_features_dicts]
    all_features = list(set(all_features_doubles))
    new_arr = np.zeros((len(arr)+1,len(all_features)), dtype=object)
    new_arr[0] = all_features
    for i in range(len(arr)):
      keys_list = [list(obj.keys())[0] for obj in all_features_arrs[i]]
      for feature in all_features:
        if feature in keys_list:
          new_arr[i+1][all_features.index(feature)] = all_features_arrs[i][keys_list.index(feature)][feature]
        else:
          continue
    df = pd.DataFrame(new_arr)
    df.columns = df.iloc[0]
    df = df.drop(labels=[0], axis=0)
    all_pic_names = [sub_arr[0] for sub_arr in arr]
    pic_names_dict = { all_pic_names.index(i)+1: i for i in all_pic_names }
    df = df.rename(index=pic_names_dict)
    df['interest'] = None
    return df

def train_model_predict(df):
    df_train = df.dropna()
    X = np.array(df_train.drop(['interest'],1))
    y = np.array(df_train['interest'])
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.5)
    clf = svm.LinearSVR()
    clf.fit(X, y)
    # df_predict = df[~df.index.isin(df_train.index)]
    df_predict = df
    # if len(list(df_predict.index)) > 0:
    df_predict_for_np = df_predict.drop(columns=['interest'])
    np_predict = np.array(df_predict_for_np)
    predictions = clf.predict(np_predict)
    predict_pics_names = list(df_predict.index)
    for pic_name in predict_pics_names:
        df['interest'][pic_name] = predictions[predict_pics_names.index(pic_name)]
        # problem with if not enough predictions 
    print('predicted:     ', df)
    return df
